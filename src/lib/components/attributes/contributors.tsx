import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Link, Tooltip } from 'components';
import { GITHUB_CONTRIBUTORS_URL, GITHUB_URL } from 'lib/constants';
const RepoMasterURL = `${GITHUB_URL}/tree/master/src`;

export interface Contributor {
  name: string;
  avatar: string;
  url: string;
}

interface Props {
  path: string;
}

interface ContributorWithDetails {
  name: string;
  avatar_url: string;
  html_url: string;
}

const getContributors = async (path: string): Promise<Array<ContributorWithDetails>> => {
  try {
    const response = await fetch(`${GITHUB_CONTRIBUTORS_URL}/commits?path=src${path}`);
    if (!response.ok || response.status === 204) return [];

    const commits = await response.json();
    const uniqueContributorsSet = new Set();
    const contributorsWithDetails = commits
      .map(commit => {
        const login = commit.author.login;

        if (!uniqueContributorsSet.has(login)) {
          uniqueContributorsSet.add(login);
          return {
            avatar_url: commit.author.avatar_url,
            html_url: commit.author.html_url,
            name: commit.author.login,
          };
        }

        return null;
      })
      .filter(Boolean);

    return contributorsWithDetails;
  } catch (e) {
    return [];
  }
};

const Contributors: React.FC<Props> = ({ path }) => {
  const [users, setUsers] = useState<Array<ContributorWithDetails>>([]);
  const link = useMemo(() => `${RepoMasterURL}/${path || '/components'}`, [path]);

  useEffect(() => {
    let unmount = false;
    (async () => {
      const contributors = await getContributors(path);
      if (unmount) return;
      setUsers(contributors);
    })();
    return () => {
      unmount = true;
    };
  }, []);

  return (
    <div className="contributors">
      {users.map((user, index) => (
        <Tooltip leaveDelay={0} text={<b>{user.name}</b>} key={`${user.html_url}-${index}`}>
          <Link color target="_blank" rel="nofollow" href={user?.html_url}>
            <Avatar src={user?.avatar_url} />
          </Link>
        </Tooltip>
      ))}
      <Tooltip leaveDelay={0} text={'Edit this page on GitHub'} type="dark">
        <Link color target="_blank" rel="nofollow" href={link}>
          <Avatar text="Add" />
        </Link>
      </Tooltip>
      <style jsx>{`
        .contributors {
          padding-left: 5px;
          padding-top: 5px;
          max-width: 100%;
          height: auto;
          display: flex;
          flex-wrap: wrap;
        }

        .contributors :global(.tooltip) {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};

export default Contributors;
