var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');


exports.foaf_map = function (id, cb) {

    var hashTags = {};

    var bEntity = true;
    var filter = null;

    var folder = path.join(__dirname, '../../public/js/.');

    var nodes = {};
    var edges = {};
    var data = { 
        'nodes' : nodes,
        'edges' : edges,
    }
                
    data = 
    
{
  nodes: [
    {
      id: '#90',
      typeOf: 'entity',
      label: 'Illinois',
      title: ' [#90] subject: < Illinois > predicate: <  typeOf  > object: < Region> ',
        group: 'globe'
    },
    {
      id: '#92',
      typeOf: 'entity',
      label: 'Byron, IL',
      title: ' [#92] subject: < Byron, IL > predicate: <  typeOf  > object: < Locale> ',
        group: 'marker'
    },
    {
      id: '#93',
      typeOf: 'entity',
      label: 'Rockford, IL',
      title: ' [#93] subject: < Rockford, IL > predicate: <  typeOf  > object: < Locale> ',
        group: 'marker'
    },
    {
      id: '#94',
      typeOf: 'entity',
      label: 'Loves Park',
      title: ' [#94] subject: < Loves Park > predicate: <  typeOf  > object: < Locale> ',
        group: 'marker'
    },
    {
      id: '#488',
      typeOf: 'foaf:group',
      label: 'Transform Rockford',
      title: ' [#488] subject: < Transform Rockford> predicate: <  typeOf  > object: < Group > ',
        group: 'group'
    },
    {
      id: '#88',
      typeOf: 'foaf:org',
      label: 'Asterius Media LLC',
      title: ' [#88] subject: < Asterius Media LLC> predicate: <  typeOf  > object: < Company > ',
        group: 'company'
    },
    {
      id: '#87',
      typeOf: 'foaf:org',
      label: 'Danfoss',
      title: ' [#88] subject: < Danfoss > predicate: <  typeOf  > object: < Company > ',
        group: 'company'
    },
    {
      id: '#495',
      typeOf: 'article',
      label: 'Article ',
      title: ' [#495] subject: < An introduction to Wardley (Value Chain) Mapping > predicate: <  is a  > object: < Article > ',
        group: 'book'
    },

    {
      id: '#770',
      typeOf: 'http://xmlns.com/foaf/0.1/primaryTopic',
      label: 'Topics',
      title: '',
      group: 'tags'
    },
    {
      id: '#777',
      typeOf: 'http://xmlns.com/foaf/0.1/primaryTopic',
      label: 'IT Management',
      title: '',
      group: 'tag'
    },
    {
      id: '#778',
      typeOf: 'http://xmlns.com/foaf/0.1/primaryTopic',
      label: 'Software Development',
      title: '',
      group: 'tag'
    },
    {
      id: '#779',
      typeOf: 'http://xmlns.com/foaf/0.1/primaryTopic',
      label: 'Cloud Computing',
      title: '',
      group: 'tag'
    },
    {
      id: '#me',
      typeOf: 'foaf:Person',
      label: 'Jeffrey Stewart',
      title: ' [#me] subject: < Jeffrey Stewart  > predicate: < typeOf > object: < Person > ',
        group: 'person'
    },
    {
      id: '#490',
      typeOf: 'foaf:Person',
      label: 'Debra Stewart',
      title: ' [#489] subject: < Debra Stewart  > predicate: < typeOf > object: < Person > ',
        group: 'person'
    },
    {
      id: '#491',
      typeOf: 'foaf:Person',
      label: 'Mike Schablaske',
      title: ' [#489] subject: < Mike Schablaske  > predicate: <  typeOf  > object: < Person > ',
        group: 'person'
    },
    {
      id: '#492',
      typeOf: 'foaf:Person',
      label: 'Jake Wilson',
      title: ' [#489] subject: < Jake Wilson  > predicate: < typeOf > object: < Person > ',
        group: 'person'
    },
        {
      id: '#493',
      typeOf: 'foaf:Person',
      label: 'Dannette Holifield',
      title: ' [#493] subject: < Dannette Holifield > predicate: < typeOf > object: < Person > ',
        group: 'person'
    },
  ],
  edges: [
    {
      from: '#777',
      to: '#770',
      label: ''
    },
    {
      from: '#778',
      to: '#770',
      label: ''
    },
    {
      from: '#779',
      to: '#770',
      label: ''
    },
    {
      from: '#92',
      to: '#90',
      label: '< part of >'
    },
    {
      from: '#93',
      to: '#90',
      label: '< part of >'
    },
    {
      from: '#94',
      to: '#90',
      label: '< part of >'
    },
    {
      from: '#488',
      to: '#me',
      label: '< participant >'
    },
    {
      from: '#488',
      to: '#493',
      label: '< participant >'
    },
    {
      from: '#88',
      to: '#92',
      label: '< location >'
    },
    {
      from: '#me',
      to: '#92',
      label: '< lives in >'
    },
    {
      from: '#me',
      to: '#495',
      label: '< author of >'
    },
    {
      from: '#me',
      to: '#88',
      label: '< employed by >'
    },
    {
      from: '#me',
      to: '#490',
      label: '< spouse of>'
    },
    {
      from: '#490',
      to: '#92',
      label: '< lives in >'
    },
    {
      from: '#me',
      to: '#777',
      typeOf: 'http://www.w3.org/2006/vcard/ns#skill',
      label: '< has skill >'
    },
    {
      from: '#me',
      to: '#778',
      typeOf: 'http://www.w3.org/2006/vcard/ns#skill',
      label: '< has skill >'
    },
    {
      from: '#me',
      to: '#779',
      label: '< has skill >',
      typeOf: 'http://www.w3.org/2006/vcard/ns#skill',
    },
    {
      from: '#me',
      to: '#492',
      label: '<knows>'
    },
    {
      from: '#me',
      to: '#491',
      label: '<knows>'
    },
    {
      from: '#493',
      to: '#me',
      label: '< Colleague Of >'
    },
    {
      from: '#493',
      to: '#93',
      label: '< lives in >'
    },
    {
      from: '#493',
      to: '#777',
      label: '< has skill >'
    },
    {
      from: '#me',
      to: '#493',
      label: '< Colleague Of >'
    },
    {
      from: '#491',
      to: '#488',
      label: '<employedby>'
    },
    {
      from: '#491',
      to: '#93',
      label: '< lives in >'
    },
    {
      from: '#492',
      to: '#488',
      label: '<employedby>'
    },
    {
      from: '#488',
      to: '#93',
      label: '< location >'
    },
    {
      from: '#492',
      to: '#491',
      label: '< work with >'
    },
    {
      from: '#491',
      to: '#492',
      label: '< employer of >'
    },
    {
      from: '#491',
      to: '#492',
      label: '< work with >'
    },
    {
      from: '#493',
      to: '#492',
      label: '< knows >'
    },
    {
      from: '#493',
      to: '#491',
      label: '< knows >'
    },
    {
      from: '#493',
      to: '#87',
      label: '< employed by >'
    },
    {
      from: '#87',
      to: '#94',
      label: '< location >'
    },
  ]
}
    
    console.log(data)
    cb(null, data);
};
