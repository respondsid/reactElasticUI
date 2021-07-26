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


GET accounts/_search?q='hill'
{
    "_source": [
        "account_number",
        "firstname",
        "lastname",
        "gender",
        "employer",
        "age",
        "Address",
        "email",
        "state",
        "balance"
    ],
    "aggs": {
        "gender": {
            "terms": {
                "field": "gender.raw",
                "size": 100
            }
        },
        "employer": {
            "terms": {
                "field": "employer.raw",
                "size": 100
            }
        },
        "age": {
            "range": {
                "field": "age",
                "ranges": [
                    {
                        "to": 20
                    },
                    {
                        "from": 10,
                        "to": 30
                    },
                    {
                        "from": 30,
                        "to": 60
                    },
                    {
                        "from": 60
                    }
                ]
            }
        },
        "state": {
            "terms": {
                "field": "state.raw",
                "size": 100
            }
        },
        "balance": {
            "range": {
                "field": "balance",
                "ranges": [
                    {
                        "to": "6000"
                    },
                    {
                        "from": "6000",
                        "to": "15000"
                    },
                    {
                        "from": "15000",
                        "to": "45000"
                    },
                    {
                        "from": "45000"
                    }
                ]
            }
        }
    },
    "query": {
        "bool": {
            "must": []
        }
    },
    "size": 20,
    "from": 0
}


POST /accounts/_search
{
    "_source": [
        "account_number",
        "firstname",
        "lastname",
        "gender",
        "employer",
        "age",
        "Address",
        "email",
        "state",
        "balance"
    ],
    "aggs": {
        "gender": {
            "terms": {
                "field": "gender.raw",
                "size": 100
            }
        },
        "employer": {
            "terms": {
                "field": "employer.raw",
                "size": 100
            }
        },
        "age": {
            "range": {
                "field": "age",
                "ranges": [
                    {
                        "to": 20
                    },
                    {
                        "from": 10,
                        "to": 30
                    },
                    {
                        "from": 30,
                        "to": 60
                    },
                    {
                        "from": 60
                    }
                ]
            }
        },
        "state": {
            "terms": {
                "field": "state.raw",
                "size": 100
            }
        },
        "balance": {
            "range": {
                "field": "balance",
                "ranges": [
                    {
                        "to": "6000"
                    },
                    {
                        "from": "6000",
                        "to": "15000"
                    },
                    {
                        "from": "15000",
                        "to": "45000"
                    },
                    {
                        "from": "45000"
                    }
                ]
            }
        }
    },
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "gender.raw": "M"
                    }
                },
                {
                    "multi_match": {
                        "query": "hill",
                        "type": "most_fields"
                    }
                }
            ]
        }
    },
    "size": 20,
    "from": 0
}