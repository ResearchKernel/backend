"use strict";

module.exports = logger => {
  const options = {
    hosts: [
      "https://search-researchkernel-634iskudbbrvfruaytepewyo3i.us-east-1.es.amazonaws.com"
    ],
    connectionClass: require("http-aws-es"),
    log: process.env.NODE_ENV === "development" ? "trace" : ["info", "error"]
  };

  const client = require("elasticsearch").Client(options);

  client.cluster.health({}, function(err) {
    if (!err) {
      console.log("[Elasticsearch] connection successfull.");
    } else {
      console.log("[Elasticsearch] connection failed.");
    }
  });
  return client || {};
};
