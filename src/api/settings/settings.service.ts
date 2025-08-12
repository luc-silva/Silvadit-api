import { Injectable } from '@nestjs/common';
import { SettingsRepository } from './repository/settings.repository';

@Injectable()
export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  async getUsersSettings() {
    return await this.settingsRepository.getSettings();
  }

  async updateSettings() {
    return await this.settingsRepository.getSettings();
  }
}
