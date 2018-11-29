#!/usr/bin/env python

import os

from common_py.system.executor import Executor as ex


BUILDTYPES = ['debug', 'release']


# check if current pull request depends on path
# return -1 if not depends, else if depends
def check_change(path):
    commit_range = os.getenv('TRAVIS_COMMIT_RANGE').partition('...')
    commit_head = commit_range[0]
    commit_base = commit_range[2]
    commit_diff = ex.run_cmd_output('git',
                                    ['diff', commit_head, commit_base], True)
    return commit_diff.find(path)


def build_jerry():
    if check_change('deps/jerry') != -1:
        ex.check_run_cmd('./deps/jerry/tools/run-tests.py',
                         ['--unittests', '--jerry-test-suite'])


def build_iotjs(buildtype, args=[], env=[]):
    ex.check_run_cmd('./tools/build.py',
                     ['--clean', '--buildtype=' + buildtype] + args, env)


if __name__ == '__main__':
    test = os.getenv('OPTS')
    if test == 'host-linux':
        build_jerry()
        for buildtype in BUILDTYPES:
            build_iotjs(buildtype, [
                '--run-test=full',
                '--no-check-valgrind'])

    elif test == "host-darwin":
        for buildtype in BUILDTYPES:
            build_iotjs(buildtype, [
                '--run-test=full',
                '--no-check-valgrind',
                '--profile=test/profiles/host-darwin.profile'])

    elif test == 'rpi2':
        for buildtype in BUILDTYPES:
            build_iotjs(buildtype, [
                        '--target-arch=arm',
                        '--target-board=rpi2',
                        '--profile=test/profiles/rpi2-linux.profile'])

    elif test == "no-snapshot":
        for buildtype in BUILDTYPES:
            build_iotjs(buildtype, [
                        '--run-test=full',
                        '--no-check-valgrind',
                        '--no-snapshot',
                        '--jerry-lto'])

    elif test == 'napi':
        for buildtype in BUILDTYPES:
            build_iotjs(buildtype, [
                '--run-test=full',
                '--no-check-valgrind',
                '--napi'])

    elif test == "coverity":
        ex.check_run_cmd('./tools/build.py', ['--clean'])
