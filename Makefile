# Download orc.org RMS files and convert to json/csv using scoring.py
#

URL = http://data.orc.org/public/WPub.dll?action=DownRMS&ext=json&CountryId=
COUNTRIES = AHO ARG AUS AUT BRA BUL CAN CRO CYP DEN ECU ESP EST FIN FRA GBR \
            GER GRE HKG HUN ISR ITA JPN KOR LAT LTU MLT MNE NED NLS NOR PER \
            POL POR ROU RSA RUS SLO SUI SWE TUR UKR USA


YEAR = 2020

JSON_FILES = $(addprefix data/$(YEAR)/, $(addsuffix $(YEAR).json, $(COUNTRIES)))

HEADERS += -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch'
HEADERS += -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0'
HEADERS += -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
HEADERS += -H 'Referer: http://data.orc.org/public/WPub.dll'
HEADERS += -H 'Connection: keep-alive'

BASE = ALL$(YEAR)

# use `make site` to build new json for the site.
all: site

# use `make json` to fetch new files from orc.org
json: $(JSON_FILES)

data:
	mkdir -p data/$(YEAR)

# Fetch the files from orc.org.
data/$(YEAR)/%$(YEAR).json: data
	# Simple wget doesn't work here, with wget the downloaded file only contains the header.
	curl '$(URL)$*' $(HEADERS) --compressed > $@

csv:
	./scoring.py csv > $(BASE).csv

json:
	./scoring.py json > $(BASE).json

site:
	./scoring.py site

clean:
	rm $(BASE).*
	rm -rf data/*.rms

test:
	npm run lint
	flake8 --ignore=E501 scoring.py parser/*.py

.PHONY: site
