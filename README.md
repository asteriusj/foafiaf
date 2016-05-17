# foafiaf
__FOAFIAF__: Friend Of A Friend Is A Friend - A community network mapping capability


## Goals and Objectives
_The goal is to develop enabling capabilities to achieve discovery of network relationships and..._

## Enabling Capabilities

### Select Starting Point
The user has the ability to select a starting a source RDF 

* Ability to enter URL of an RDF dataset
* Ability to upload and RDF dataset file
* Ability to paste contents of an RDF dataset 

* Ability to convert RDF into JSON-LD format from XML, N3, TTL


### Visualize Linked Data

* Ability to view metadata of primary RDF entity in UI panel (ala WebVowl)
* Ability to filter what RDF content is displayed via UI controls (ala WebVowl, LodLive)
* Ability to visualize nodes for FOAF class things represented by icons
* Ability to visualize nodes for FOAF property things represented as text
* Ability to visualize edges that connect nodes for RDF predicates as links
* Ability to visualize RDF graph Subject and Predicate as nodes
* Ability to visualize DRF graph Predicate as edges


### Interactive Traversal

* Ability to display node detail when selected by user
* Ability to show edges and 1 level connected nodes for node selected
* Ability to show 1 + n level connectections baased upon configuration of n degrees



### Follow and Retrieve

* Ability to retrieve graphs via URI when needed by user actions
* Ability to store new RDF datasets in memory when retrieve via URI






# Useful tools and references

RDF Validator and Converter
http://rdfvalidator.mybluemix.net/

JSON-LD Playground
http://json-ld.org/playground/

WebVowl
http://vowl.visualdataweb.org/webvowl.html
https://github.com/VisualDataWeb/WebVOWL


## initial git integration steps

git config --global user.name "asteriusj"
git config --global user.email "jstewart@asteriusmedia.com"
git init
git add .
git commit -m "first commit"
git remote add origin git@github.com:asteriusj/foafiaf.git
git push -u origin master