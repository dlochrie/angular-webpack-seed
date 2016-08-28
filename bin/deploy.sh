#!/usr/bin/env bash
# Builds all necessary files and copies them over to the proper location.

BUILD_DIR=./build

# Replace/clean the build directory.
rm -rf $BUILD_DIR/* &> /dev/null
mkdir $BUILD_DIR &> /dev/null

# Compile and Generate all necessary files.
./bin/compile-less.sh
./bin/generate-translations.sh
./bin/compile-tpls.sh
./bin/compile-js.sh

# Create the new directories.
mkdir -p $BUILD_DIR/css \
    $BUILD_DIR/fonts \
    $BUILD_DIR/images \
    $BUILD_DIR/js

# Copy all the new files to the build target.
cp ./public/css/* $BUILD_DIR/css &> /dev/null
cp ./public/fonts/* $BUILD_DIR/fonts &> /dev/null
cp ./public/images/* $BUILD_DIR/images &> /dev/null
cp ./public/js/*.js $BUILD_DIR/js &> /dev/null
cp ./public/* $BUILD_DIR &> /dev/null

echo "Deploy Done."
