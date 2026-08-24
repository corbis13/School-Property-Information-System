import urllib.request, urllib.parse
payload = urllib.parse.urlencode({'action':'addClassification','classification':'TestCheck'}).encode()
req = urllib.request.Request('https://script.google.com/macros/s/AKfycbzDSGKr9vbIyvnoKnXHCUsFYdUNgZIWsNth-0ZCDuTxbEPJnmSABMFrK2pPKm6cpyb8/exec', data=payload, headers={'Content-Type':'application/x-www-form-urlencoded'})
try:
    with urllib.request.urlopen(req, timeout=25) as r:
        print('status', r.status)
        print(r.read().decode('utf-8','ignore'))
except Exception as e:
    print(type(e).__name__, e)
