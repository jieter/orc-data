import json
import os
from itertools import count
from pathlib import Path

from . import COUNTRIES
from .util import time_allowance2speed

# for boats without a sailnumber, give them a unique number
counter = count()

SITE_PATH = Path("site")
INDEX_PATH = SITE_PATH / "index.json"
EXTREMES_PATH = SITE_PATH / "extremes.json"
DATA_PATH = SITE_PATH / "data"

def floats(*args):
    return list(map(float, args))

def format_data(data):
    country = data["country"]
    if data.get("SailNo", None):
        sailnumber = data["SailNo"].replace(" ", "").replace("-", "").replace("/", "")
    else:
        sailnumber = f"_{next(counter)}"

    sailnumber = f"{country}/{sailnumber}"
    ret = {
        "sailnumber": sailnumber.strip(),
        "country": country,
        "name": (data.get("YachtName", "") or "").strip(),
        "rating": {
            "gph": float(data["GPH"]),
            "osn": float(data["OSN"]),
            "triple_offshore": floats(data["TN_Offshore_Low"], data["TN_Offshore_Medium"], data["TN_Offshore_High"]),
            "triple_inshore": floats(data["TN_Inshore_Low"], data["TN_Inshore_Medium"], data["TN_Inshore_High"]),
        },
        "boat": {
            "builder": (data["Builder"] or "").strip(),
            "type": data["Class"],
            "designer": (data["Designer"] or "").strip(),
            "year": data["Age_Year"],
            "sizes": {
                "loa": float(data["LOA"]),
                "beam": round(float(data["MB"]), 2),
                "draft": round(float(data["Draft"]), 2),
                "displacement": float(data["Dspl_Measurement"]),
                "genoa": float(data["Area_Jib"]),
                "main": float(data["Area_Main"] or 0),
                "spinnaker": float(data["Area_Sym"] or 0),
                "spinnaker_asym": float(data.get("Area_Asym", data.get("Area_ASym")) or 0.0),
                "crew": float(data["CrewWT"]),
                "wetted_surface": float(data["WSS"]),
            },
            "stability_index": float(data["Stability_Index"] if "Stability_Index" in data else -1),
        },
    }

    # Velocity prediction
    ret["vpp"] = {
        "angles": data["Allowances"]["WindAngles"],
        "speeds": data["Allowances"]["WindSpeeds"],
    }
    for i, twa in enumerate(data["Allowances"]["WindAngles"]):
        ret["vpp"][twa] = list(
            [time_allowance2speed(data["Allowances"]["R%d" % twa][a]) for a, tws in enumerate(data["Allowances"]["WindSpeeds"])]
        )

    ret["vpp"]["beat_angle"] = data["Allowances"]["BeatAngle"]
    ret["vpp"]["beat_vmg"] = list([time_allowance2speed(v) for v in data["Allowances"]["Beat"]])

    ret["vpp"]["run_angle"] = data["Allowances"]["GybeAngle"]
    ret["vpp"]["run_vmg"] = list([time_allowance2speed(v) for v in data["Allowances"]["Run"]])

    return ret

def jsonwriter_list(rmsdata):
    data = list(map(format_data, rmsdata))
    data = sorted(data, key=lambda x: x["name"])

    print(data)

    with open("orc-data.json", "w") as outfile:
        json.dump(data, outfile, separators=(",", ":"))


def jsonwriter_site(rmsdata):
    data = map(format_data, rmsdata)
    # sort by name
    data = sorted(data, key=lambda x: x["name"])
    # filter out boats without country
    data = list(filter(lambda x: x["country"].upper() in COUNTRIES, data))

    # Write the index
    with INDEX_PATH.open("w+") as outfile:
        index = [[boat["sailnumber"], boat["name"], boat["boat"]["type"]] for boat in data]
        json.dump(index, outfile, separators=(',', ':'))

    # Create subdirectories for all countries
    for country in COUNTRIES:
        (SITE_PATH / f"data/{country}/").mkdir(parents=True, exist_ok=True)

    # Write data for each boat to json
    for boat in data:
        sailnumber = boat["sailnumber"]
        with open(f"site/data/{sailnumber}.json", "w+") as outfile:
            json.dump(boat, outfile, indent=2)


def jsonwriter_extremes():
    data = []
    for boat_file in DATA_PATH.glob("**/*.json"):
        data.append(json.loads(boat_file.read_text()))

    print("Total boats loaded: ", len(data))
    def vppmax(boat):
        twas = [str(twa) for twa in  boat["vpp"]["angles"]]
        vppmax = max(sum([boat["vpp"][twa] for twa in twas], []))
        twa_20 = [boat["vpp"][twa][-1] for twa in twas]
        twa_20_avg = sum(twa_20) / len(twa_20)

        # If the max VPP is more than twice the average of the boat speeds at 20 kts wind, discard the boat
        if twa_20_avg * 2 > vppmax:
            return vppmax
        return -1

    fast_boats = sorted(data, key=vppmax, reverse=True)
    fast_boats = list(filter(lambda boat: vppmax(boat) > 0, fast_boats))
    sailno_vppmax = lambda boats: list(
        [(boat["sailnumber"], boat["name"], boat["boat"]["type"], vppmax(boat)) for boat in boats]
    )

    def sailno_sizekey(key, limit=10):
        boats = sorted(data, key=lambda boat: boat["boat"]["sizes"][key], reverse=True)[:limit]
        return list(
            [(boat["sailnumber"], boat["name"], boat["boat"]["type"], boat["boat"]["sizes"][key]) for boat in boats]
        )

    extremes = {
        "max_speed": sailno_vppmax(fast_boats[:10]),
        "min_speed": sailno_vppmax(fast_boats[-10:]),
        "max_length": sailno_sizekey("loa"),
        "max_displacement": sailno_sizekey("displacement"),
        "max_draft": sailno_sizekey("draft"),
    }

    with EXTREMES_PATH.open("w+") as outfile:
        json.dump(extremes, outfile, indent=2)
