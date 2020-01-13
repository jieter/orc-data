from __future__ import print_function

import json
import os
from itertools import count

from . import COUNTRIES, WIND_ANGLES, WIND_SPEEDS
from .util import time_allowance2speed

# for boats without a sailnumber, give them a unique number
counter = count()


def select(boats, key, value):
    for boat in boats:
        if boat[key] in (value, "NED%s" % value):
            return boat

    return None


def format_data(data):
    country = data["country"]
    if data.get("SailNo", None):
        sailnumber = data["SailNo"].replace(" ", "").replace("-", "").replace("/", "")
    else:
        sailnumber = f"_{next(counter)}"

    sailnumber = f"{country}/{sailnumber}"

    ret = {
        "sailnumber": sailnumber,
        "country": country,
        "name": data.get("YachtName", "") or "",
        "owner": "-",
        "rating": {
            "gph": float(data["GPH"]),
            "osn": float(data["OSN"]),
            "triple_offshore": list(
                map(
                    float,
                    [
                        data["TN_Offshore_Low"],
                        data["TN_Offshore_Medium"],
                        data["TN_Offshore_High"],
                    ],
                )
            ),
            "triple_inshore": list(
                map(
                    float,
                    [
                        data["TN_Inshore_Low"],
                        data["TN_Inshore_Medium"],
                        data["TN_Inshore_High"],
                    ],
                )
            ),
        },
        "boat": {
            "builder": data["Builder"],
            "type": data["Class"],
            "designer": data["Designer"],
            "year": data["Age_Year"],
            "sizes": {
                "loa": float(data["LOA"]),
                "beam": round(float(data["MB"]), 2),
                "draft": round(float(data["Draft"]), 2),
                "displacement": float(data["Dspl_Measurement"]),
                "genoa": float(data["Area_Jib"]),
                "main": float(data["Area_Main"]),
                "spinnaker": float(data["Area_Sym"]),
                "spinnaker_asym": float(data["Area_ASym"]),
                "crew": float(data["CrewWT"]),
                "wetted_surface": float(data["WSS"]),
            },
        },
        # 'raw': data,
    }
    # velocity prediction
    ret["vpp"] = {
        "angles": WIND_ANGLES,
        "speeds": WIND_SPEEDS,
    }
    for i, twa in enumerate(WIND_ANGLES):
        ret["vpp"][twa] = list(
            [
                time_allowance2speed(data["Allowances"]["R%d" % twa][a])
                for a, tws in enumerate(WIND_SPEEDS)
            ]
        )

    ret["vpp"]["beat_angle"] = data["Allowances"]["BeatAngle"]
    ret["vpp"]["beat_vmg"] = list(
        [time_allowance2speed(v) for v in data["Allowances"]["Beat"]]
    )

    ret["vpp"]["run_angle"] = data["Allowances"]["GybeAngle"]
    ret["vpp"]["run_vmg"] = list(
        [time_allowance2speed(v) for v in data["Allowances"]["Run"]]
    )

    return ret


def jsonwriter_single(rmsdata, sailnumber):
    data = map(format_data, rmsdata)
    data = select(data, "sailnumber", sailnumber)

    print(data)
    print(json.dumps(data, indent=2))


def jsonwriter_list(rmsdata):
    data = list(map(format_data, rmsdata))
    data = sorted(data, key=lambda x: x["name"])

    print(data)

    with open("orc-data.json", "w") as outfile:
        json.dump(data, outfile, separators=(",", ":",))


def jsonwriter_site(rmsdata):
    data = map(format_data, rmsdata)
    # sort by name
    data = sorted(data, key=lambda x: x["name"])
    # filter out boats without country
    data = list(filter(lambda x: x["country"].upper() in COUNTRIES, data))

    # Write the index
    with open("site/index.json", "w+") as outfile:
        json.dump(
            [[boat["sailnumber"], boat["name"], boat["boat"]["type"]] for boat in data],
            outfile,
        )

    # Create subdirectories for all countries
    for country in COUNTRIES:
        country_directory = f"site/data/{country}/"
        if not os.path.exists(country_directory):
            os.makedirs(country_directory)

    # Write data for each boat to json
    for boat in data:
        sailnumber = boat["sailnumber"]
        with open(f"site/data/{sailnumber}.json", "w+") as outfile:
            json.dump(boat, outfile, indent=2)
