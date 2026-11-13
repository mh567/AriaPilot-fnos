'use strict';

const { DEFAULT_SETTINGS } = require('./settings');

function positiveInt(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function mapExternalOptions(globalOptions = {}, taskOptions = {}, fallback = {}) {
  const base = { ...DEFAULT_SETTINGS, ...fallback };
  return {
    downloadDir:
      typeof globalOptions.dir === 'string' ? globalOptions.dir.trim() : '',
    maxConcurrent: positiveInt(
      globalOptions['max-concurrent-downloads'],
      base.maxConcurrent,
    ),
    connectionsPerServer: positiveInt(
      globalOptions['max-connection-per-server'] ??
        taskOptions['max-connection-per-server'],
      base.connectionsPerServer,
    ),
    split: positiveInt(
      globalOptions.split ?? taskOptions.split,
      base.split,
    ),
    downloadLimit: globalOptions['max-overall-download-limit'] || '0',
    uploadLimit: globalOptions['max-overall-upload-limit'] || '0',
  };
}

function globalOptionPayload(settings) {
  const options = {
    'max-concurrent-downloads': String(settings.maxConcurrent),
    'max-connection-per-server': String(settings.connectionsPerServer),
    split: String(settings.split),
    'max-overall-download-limit': settings.downloadLimit || '0',
    'max-overall-upload-limit': settings.uploadLimit || '0',
  };
  if (settings.downloadDir) options.dir = settings.downloadDir;
  return options;
}

module.exports = { globalOptionPayload, mapExternalOptions };
