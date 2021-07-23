GET /accounts/_search?q='hill'

GET /accounts/_search
{
    "from": 0,
    "size": 10,
    "query": {
        "query_string": {
            "query": "hill"
        }
    }
}



GET accounts/_search?pretty 
{
    "from": 0
    ,
    "size": 20,
    "query": {
        "match": {
            "_all": "hill"
        }
    }
}
"from": 5,
    "size": 20
