import { Injectable } from '@nestjs/common';
import { SettingsRepository } from './settings.repository';

@Injectable()
export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  async getUsersSettings() {}


}
