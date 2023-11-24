import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/api/github')
  async getGithubData() {
    const data = await this.githubService.getGithubApiData();
    return data;
  }
}
