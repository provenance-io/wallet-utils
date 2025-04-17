#!/bin/bash

echo "Builds from local provenance project protos"
if [ "$#" -ne 1 ]; then
    echo "Illegal number of parameters: provenance go project path needed (e.g. ~/git/provenance)"
    exit 1;
fi

PROVPROJ=$1

echo "Using local provenance project $PROVPROJ"

THIRD_PARTY_PROTO_DIR="$PROVPROJ/third_party/proto"
PROV_PROTO_DIR="$PROVPROJ/proto/provenance"

echo "Removing existing protos"
mkdir -p third_party
cd third_party
rm -rf proto

cp -r $THIRD_PARTY_PROTO_DIR proto
cp -r $PROV_PROTO_DIR proto/provenance

echo "Done."
