# asana-json2csv

a simple script to transform an asana produced json file into a csv file

---

at Leaf we use [Asana](https://www.asana.com/) to keep track of a lot of things, some of which get crunched into Pivot Tables of their own to provide us with the information that we need to kick ass.

this is a simple script that takes a json file (`data.json`) and outputs a csv file with information from the tasks and sub-tasks needed to be pivoted on.

this csv has the bare minimum that we need to get our pivot tables singing you can modify the data simply by just modifying the `fields` array and the `simplifyTask` function.

hope this helps anyone out there trying to squeeze a bit more out of Asana.

--
Leaf Team
