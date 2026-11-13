'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { globalOptionPayload, mapExternalOptions } = require('./external');

test('mapExternalOptions reads aria2 global values with task fallback', () => {
  const mapped = mapExternalOptions(
    {
      dir: '/data/downloads',
      'max-concurrent-downloads': '8',
      'max-overall-download-limit': '1048576',
      'max-overall-upload-limit': '0',
    },
    { split: '6', 'max-connection-per-server': '3' },
  );

  assert.deepEqual(mapped, {
    downloadDir: '/data/downloads',
    maxConcurrent: 8,
    connectionsPerServer: 3,
    split: 6,
    downloadLimit: '1048576',
    uploadLimit: '0',
  });
});

test('mapExternalOptions falls back for missing or invalid values', () => {
  const mapped = mapExternalOptions({}, {}, { maxConcurrent: 4, split: 2 });
  assert.equal(mapped.maxConcurrent, 4);
  assert.equal(mapped.split, 2);
  assert.equal(mapped.downloadDir, '');
});

test('globalOptionPayload includes directory, threads and limits', () => {
  assert.deepEqual(
    globalOptionPayload({
      downloadDir: '/data/downloads',
      maxConcurrent: 6,
      connectionsPerServer: 4,
      split: 8,
      downloadLimit: '2M',
      uploadLimit: '0',
    }),
    {
      dir: '/data/downloads',
      'max-concurrent-downloads': '6',
      'max-connection-per-server': '4',
      split: '8',
      'max-overall-download-limit': '2M',
      'max-overall-upload-limit': '0',
    },
  );
});
