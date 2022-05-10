#!/usr/bin/bash
mkdir temp
curl "https://api.mockaroo.com/api/91c28d60?count=10&key=7d2bd690" > "temp/User.json"
curl "https://api.mockaroo.com/api/7d82d8c0?count=50&key=7d2bd690" > "temp/Tag.csv"