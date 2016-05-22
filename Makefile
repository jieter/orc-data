# Download orc.org RMS files and convert to json/csv using scoring.py
#

URL = http://data.orc.org/public/WPub.dll?action=DownRMS&CountryId=
COUNTRIES = ITA NOR ESP NED GRE GER POL CRO FRA SUI ARG AUS POR \
            LTU FIN RUS BRA EST ISR SWE UKR ROU HUN AUT CAN JPN \
			KOR ECU PER SLO CHN CYP NLS DEN LAT MLT MNE TUR MRI USA

YEAR = 2016

RMS_FILES = $(addprefix data/$(YEAR)/, $(addsuffix $(YEAR).rms, $(COUNTRIES)))

HEADERS += -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch'
HEADERS += -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0'
HEADERS += -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
HEADERS += -H 'Referer: http://data.orc.org/public/WPub.dll'
HEADERS += -H 'Connection: keep-alive'

BASE = ALL$(YEAR)

# use `make site` to build new json for the site.
all: site

# use `make rms` to fetch new files from orc.org
rms: $(RMS_FILES)

data:
	mkdir -p data/$(YEAR)

# Fetch the files from orc.org.
data/$(YEAR)/%$(YEAR).rms: data
	# Simple wget doesn't work here, with wget the downloaded file only contains the header.
	curl '$(URL)$*' $(HEADERS) --compressed > tmp.rms

	# Header alignment in these files seems to be broken, we fix header alignment by
	# replacing it with hand crafted header.
	{ cat header.rms; tail tmp.rms -n +2; } > $@
	rm tmp.rms

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
	flake8 --ignore=E501 scoring.py rms/*.py

.PHONY: site
