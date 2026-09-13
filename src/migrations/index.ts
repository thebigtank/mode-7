import * as migration_20260913_042617_initial from './20260913_042617_initial';

export const migrations = [
  {
    up: migration_20260913_042617_initial.up,
    down: migration_20260913_042617_initial.down,
    name: '20260913_042617_initial'
  },
];
