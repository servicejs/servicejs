#!/bin/bash

workspace=$1;
shift;
yarn workspace @service/$workspace $@;
exit 0;
