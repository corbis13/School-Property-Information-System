from html.parser import HTMLParser

class MyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag in ['area','base','br','col','embed','hr','img','input','keygen','link','meta','param','source','track','wbr']:
            return
        self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f'unexpected </{tag}> at {self.getpos()}')
            return
        start, pos = self.stack.pop()
        if start != tag:
            self.errors.append(f'mismatched </{tag}> at {self.getpos()}, expected </{start}> from {pos}')

    def close(self):
        super().close()
        if self.stack:
            for tag, pos in self.stack:
                self.errors.append(f'unclosed <{tag}> from {pos}')

parser = MyParser()
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()
parser.feed(text)
parser.close()
for e in parser.errors[:100]:
    print(e)
print('errors', len(parser.errors))
