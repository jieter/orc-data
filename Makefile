URL = http://data.orc.org/public/WPub.dll?action=DownRMS&CountryId=NED

HEADERS += -H 'DNT: 1' -H 'Accept-Encoding: gzip, deflate, sdch'
HEADERS += -H 'Accept-Language: en' -H 'User-Agent: Mozilla/5.0'
HEADERS += -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
HEADERS += -H 'Referer: http://data.orc.org/public/WPub.dll'
HEADERS += -H 'Connection: keep-alive'

BASE=NED2015

json: $(BASE).rms
	./scoring.py json > $(BASE).json

$(BASE).rms:
	# Simple wget doesn't work here, the downloaded file only contains the header.
	curl '$(URL)' $(HEADERS) --compressed > tmp.rms

	# fix header alignment by replaceing it with hand crafted header
	{ cat header.rms; tail tmp.rms -n +2; } > $(BASE).rms
	rm tmp.rms

csv: $(BASE).rms
	./scoring.py csv > $(BASE).csv

clean:
	rm $(BASE).*
