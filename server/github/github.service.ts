// contributors.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GithubService {
  async getGithubApiData(): Promise<any> {
    try {
      const repoResponse = await axios.get(`https://api.github.com/repos/red-ninjas/himalaya-ui`);
      const forksCount = repoResponse.data.forks_count;

      const contributorsResponse = await axios.get(`https://api.github.com/repos/red-ninjas/himalaya-ui/contributors`);
      const contributorsCount = contributorsResponse.data.length;
      return { forksCount, contributorsCount };
    } catch (error) {
      console.error('Error fetching contributors:', error.message);
      return [];
    }
  }
}
