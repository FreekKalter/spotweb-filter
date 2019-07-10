#!/bin/bash

source ./.api-keys; web-ext sign --ignore-files ./.api-keys --api-key=$JWT_ISSUER --api-secret=$JWT_SECRET
