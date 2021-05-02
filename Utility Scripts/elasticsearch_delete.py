from elasticsearch import Elasticsearch, RequestsHttpConnection, helpers
from requests_aws4auth import AWS4Auth

host = 'search-comse6998-xyiaghg4awnumubfxszrh56nlu.us-east-1.es.amazonaws.com'
region = 'us-east-1'
service = 'es'
awsauth = AWS4Auth('',
                   '', region,
                   service)
es = Elasticsearch(
    hosts=[{'host': host, 'port': 443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection
)

index_name = 'user_recipes'

if es.indices.exists(index=index_name):
    # result = es.search(index=index_name, body={"query": {"match_all": {}}})
    res = helpers.scan(
        client=es,
        scroll='2m',
        query={
            "query": {"match_all": {}}
        },
        index=index_name)

    print('Before deletion:')
    count = 0
    for i in res:
        print(i)
        count += 1
    print(count)
    # es.indices.delete(index=index_name)

print(index_name + ' is deleted.')
print(es.indices.exists(index=index_name))

#
# # json_object = {'objectKey': 'frontend_upload.jpg',
# #                'bucket': 'hw2-photos-s3-bucket-b2',
# #                'createdTimestamp': '2018-11-05T12:40:02',
# #                'labels': []}
# # res = es.index(index='photos', doc_type='photo', id='frontend_upload.jpg',
# #                body=json_object)
# # print(res)
#
# result = es.search(index=index_name,
#                    body={"size": 9999, "query": {"match_all": {}}})
#
# print(result['hits']['hits'])
