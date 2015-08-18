# Download orc.org RMS files and convert to json/csv using scoring.py
#

URL = http://data.orc.org/public/WPub.dll?action=DownRMS&CountryId=
COUNTRIES = ITA NOR ESP NED GRE GER POL CRO FRA SUI ARG AUS POR \
            LTU FIN RUS BRA EST ISR SWE UKR ROU HUN AUT CAN JPN \
			KOR ECU PER SLO CHN CYP NLS DEN LAT MLT MNE TUR MRI USA

YEAR = 2015

RMS_FILES = $(addprefix data/, $(addsuffix $(YEAR).rms, $(COUNTRIES)))

HEADERS += -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch'
HEADERS += -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0'
HEADERS += -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
HEADERS += -H 'Referer: http://data.orc.org/public/WPub.dll'
HEADERS += -H 'Connection: keep-alive'

BASE=ALL$(YEAR)

all: json

rms: $(RMS_FILES)

data:
	mkdir -p data/

# Fetch the files from orc.org.
# Simple wget doesn't work here, with wget the downloaded file only contains the header.
#
# Header alignment in these files seems to be broken, we fix header alignment by
# replacing it with hand crafted header.
data/%$(YEAR).rms: data
	curl '$(URL)$*' $(HEADERS) --compressed > tmp.rms

	{ cat header.rms; tail tmp.rms -n +2; } > $@
	rm tmp.rms

csv:
	./scoring.py csv > $(BASE).csv

json:
	./scoring.py json > $(BASE).json

clean:
	rm $(BASE).*
	rm -rf data/*.rms

test:
	eslint site/index.js site/src/*
	flake8 --ignore=E501 .
