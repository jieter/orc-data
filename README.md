# ORC club certificate scoring

Van http://orc.org/index.asp?id=44 zijn lijsten te downloaden met daarin gegevens over de zeilboten met een geldig ORC-certificaat.

Omdat de VPP ook wel zinnig is voor anderen, heb ik dit tooltje gemaakt.


## Columns in `.rms` file:

for `<tws>`:  [6, 8, 10, 12, 14, 16, 20]

for `<twa>`:  [52, 60, 75, 90, 110, 120, 135, 150]

### General
 - `NATCERTN.FILE_ID`
 - `SAILNUMB` sail number
 - `NAME` boat name
 - `TYPE` boat type
 - `BUILDER` boat builder
 - `DESIGNER` boat designer
 - `YEAR` Series year
 - `CLUB`
 - `OWNER` name of owner
 - `ADRS1`
 - `ADRS2`
 - `C_Type` Club or international
 - `DD_MM_yyYY HH:MM:SS` Issued on
 - `ReferenceNo`

### Hull
 - `D` IMS Division, one of 'C' (Cruiser/Racer), 'S' (Sportboat) or 'R' (Racer)
 - `LOA` Length over all (meters)
 - `IMSL` IMS Sailing Length
 - `CDL` Class Division Length
 - `DRAFT` Draft (meters)
 - `BMAX` Maximum beam (meters)
 - `DSPL` Displacement (kg)
 - `DSPS` Displacement in sailing trim (kg)
 - `CREW` Crew weight (kg)
 - `WSS` Wetted surface (m²)
 - `INDEX` Stability Index
 - `DA` Dynamic Allowance

### Sails
 - `MAIN` Maximum main sail area (m²)
 - `GENOA` Maximum genoa area (m²)
 - `SYM` Maximum symmetrical spinnaker area (m²)
 - `ASYM` Maximum asymmetrical spinnaker area (m²)

### Scoring
 - `GPH` General purpose handicap
 - `OSN` Offshore Single Number (Time-on-Distance)
 - `ILCGA` Time-on-Distance (inshore, single number)
 - `TMF-OF` Time Multiplying Factor (offshore)
 - `TMF` Time Multiplying Factor (inshore)
 - `PLT-O` Performance Line Time-on-Time Offshore
 - `PLD-O` Performance Line Time-on-Distance Offshore
 - `PLT-I` Performance Line Time-on-Time Inshore
 - `PLD-I` Performance Line Time-on-Distance Inshore
 - `OTNLOW` Offshore triple number low
 - `OTNMED` Offshore triple number mid
 - `OTNHIG` Offshore triple number high
 - `ITNLOW` Inshore triple number low
 - `ITNMED` Inshore triple number mid
 - `ITNHIG` Inshore triple number high
 - `DH_TOD` Double Handed Time-on-Distance (offshore)
 - `DH_TOT` Double Handed Time-on-Time (offshore)
 - `PLT2H` Performance Line, Time-on-Time, Double Handed
 - `PLD2H` Performance Line, Time-on-Distance, Double Handed

### Velocity Prediction
 - `UA<tws>` optimal beat angle @tws (true wind angle)
 - `DA<tws>` optimal gybe angle @tws (true wind angle)
 - `UP<tws>` Beat VMG @tws (s/Nautical mile)
 - `R<twa><tws>` Time allowance @twa/@tws (s/Nautical mile)
 - `D<tws>` Run VMG @tws (s/Nautical mile)

### Selected Courses
 - `WL<tws>` Windward / Leeward @tws
 - `OL<tws>` ?? @tws
 - `CR<tws>` Circular random @tws
 - `NSP<tws>` Non spinnaker circular random @tws
 - `OC<tws>` Ocean for Performance Curve Scoring (PCS) @tws

## Links
 - [Uitleg over certificaat op orc.org](http://orc.org/index.asp?id=23)
 - OpenCPN book: [weather routing plugin](http://opencpn.org/ocpn/book/export/html/267)
 - Collapse sidebar (http://www.bootply.com/mL7j0aOINa)
 - Bootstrap toggle switch (interpolation on/off) http://www.bootstraptoggle.com/

## update site voor een nieuw jaar

- (Pas het jaar aan in `Makefile`)
- Download de nieuwe RMS-files met `make rms`
- Converteer naar de juiste site-jsons met `make site`
- Update jaartal en site, update bundle (`npm run bundle`) en commit.

## TODO

 - allow switching between polar and cartesian axis
 - allow comparing two boats side by side
