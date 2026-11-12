'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
test('application JavaScript compiles',()=>{assert.ok(js);new vm.Script(js)});
test('property tab and handlers exist',()=>{assert.match(html,/data-tab="propertyManagement"/);for(const name of ['propertyData','propertyManagement','propertyForm','propertyRentForm','propertyPaymentForm','propertyPrint'])assert.match(js,new RegExp('function '+name+'\\('))});
test('legacy HVAC keys and encryption retained',()=>{assert.match(js,/hvac_invoice_manager_v1/);assert.match(js,/function migrateOntario\(/);assert.match(js,/function encryptBackup\(/);assert.match(js,/function unlockVault\(/)});
test('rent invoice duplicate guard and partial payment bounds present',()=>{assert.match(js,/p\.rentInvoices\.some\(/);assert.match(js,/amount<=0/);assert.match(js,/Math\.round\(remaining\*100\)/)});
