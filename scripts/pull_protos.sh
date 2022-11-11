#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters: release required (e.g. v1.13.0-rc3)"
    exit 1;
fi

REL=$1
DL_URL="https://github.com/provenance-io/provenance/releases/download/$REL/protos-$REL.zip"
OUT_FILE="protos-$REL.zip"

echo "Using release $REL"

echo "Starting proto copy"

echo "Removing existing protos"
cd third_party
rm -rf proto

echo "Downloading $DL_URL"
curl -sSL -o "$OUT_FILE" $DL_URL

echo "Unpacking protos"
unzip $OUT_FILE
