#!/usr/bin/env node

/**
TODO List:
1) Spinner ora
2) return only difference to ix kw
3) JSON Output
4) Better Tables
5) Cleanier Output
**/

const program = require('commander');
const colors = require('colors');

const list_speakers = require('../lib/list_speakers.js');
const $ = require('../lib/bgp.js');
const { speakers } = require('../lib/values.js');
const _ = require('../lib/missing.js');

process.setMaxListeners(20); //Fixed Memory Leak Warnings

//List_Speaker
program
  .command('speakers') // sub-command name
  .alias('s') // alternative sub-command is `al`
  .description('List all Kuwait BGP Speakers') // command description
  .action(function () {
        list_speakers();
   });

//List spef. speaker Difference to IX
program
  .command('list') // sub-command name
  .alias('ls') // alternative sub-command is `al`
  .description('List difference of [speaker] to ixkw') // command description
  .action(function () {
        let alias = process.argv[3];
		speakers.forEach((speaker) => {
			if (speaker.alias == alias && speaker.dualPeering == false && speaker.multiAS == false) {
				$.prefixCompare(speaker.asn,speaker.ixkwrs1,speaker.ixkwrs2);
			} else if (speaker.alias == alias && speaker.dualPeering == true && speaker.multiAS == false) {
				$.prefixDualPeerCompare(speaker.asn,speaker.ixkwrs1_0,speaker.ixkwrs1_1,speaker.ixkwrs2_0,speaker.ixkwrs2_1);
			} else if (speaker.alias == alias && speaker.dualPeering == false && speaker.multiAS == true) { 
				$.prefixDualASCompare(speaker.asn,43852,speaker.ixkwrs1,speaker.ixkwrs2);
			} else if (speaker.alias == alias && speaker.dualPeering == true && speaker.multiAS == true) {
				$.prefixDualASPeerCompare(speaker.asn,42781,speaker.ixkwrs1_0,speaker.ixkwrs1_1,speaker.ixkwrs2_0,speaker.ixkwrs2_1);
			}
 		});
	});

program
  .command('missing') // sub-command name
  .alias('m') // alternative sub-command is `al`
  .description('List all missing prefixes in Kuwait') // command description
  .action(function () {
        _.showAllMissing()
   });

//process arg from bash
program.parse(process.argv);




