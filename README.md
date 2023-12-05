#### To test watchman independently

```
watchman watch-project C:\path\to\your\directory
```

```
watchman --json-command -p < C:\path\to\your\subscription.json
```

with
```
// subscription.json

[
  "subscribe",
  "C:\\path\\to\\your\\directory",
  "myconsolelog",
  {
    "expression": ["allof", ["match", "*"]],
    "fields": ["name", "new", "exists", "size", "mode"]
  }
]
```