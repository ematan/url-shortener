#! /usr/bin/env bash

export NODE_ENV=test

run_tests() {
  jest --verbose --runInBand -- "${@}" \
    && { echo "[PASS]"; } \
    || { echo "[FAIL]"; exit 1; }
}

sleep_for() {
  local secs="${1}"
  while test ${secs} -gt 0; do
      echo -ne "\rsleeping ${secs} s\033[0K"
      sleep 1
      secs=$((secs-1))
  done
}

run_all() {
  run_tests test/unit-tests.test.js test/integration-tests.test.js
  sleep_for 120
  run_tests test/ttl.test.js
}

if test $# -eq 0; then
  run_all
else
  for f in "${@}"; do
    echo "${f}"
    test -f "${f}" || { echo "[ERROR] '${f}' does not exist"; exit 1; }
  done
  run_tests "${@}"
fi
