curl -X PUT -d '{"word":"word1", "description":"val2"}' localhost:3000/definition
curl localhost:3000/definition/val
curl -X DELETE localhost:3000/definition/val
