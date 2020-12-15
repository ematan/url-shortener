#! /usr/bin/env bash

export NODE_ENV=test

runTests() {
   jest --verbose --runInBand -- "${@}"
   rc=$?
   test ${rc} -eq 0 \
    && { echo "[PASS]"; } \
    || { echo "[FAIL]"; exit ${rc}; }
}

sleep_for() {
  local secs="${1}"
  while test ${secs} -gt 0; do
      echo -ne "\rsleeping ${secs} s\033[0K"
      sleep 1
      secs=$((secs-1))
  done
}

runTests test/unit-tests.test.js test/integration-tests.test.js

sleep_for 120

runTests test/ttl.test.js
