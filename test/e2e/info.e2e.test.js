import cp from 'child_process';
import { promisify } from 'util';

const exec = promisify(cp.exec);

process.env['FRODO_MOCK'] = 'ON';
const env = {
  env: process.env,
};

const host = 'https://openam-frodo-dev.forgeblocks.com/am';
const user = 'volker.scheuber@forgerock.com';
const pass = 'Sup3rS3cr3t!';
// const realm = 'alpha';

describe('frodo info', () => {
  test('"frodo info": should display cookie name, session id, and access token', async () => {
    const CMD = `frodo info ${host} ${user} ${pass}`;
    const { stderr } = await exec(CMD, env);
    expect(stderr).toMatchSnapshot();
  });

  test('"frodo info -s": should output cookie name, session id, and access token in json', async () => {
    const CMD = `frodo info -s ${host} ${user} ${pass}`;
    const { stdout } = await exec(CMD, env);
    expect(stdout).toMatchSnapshot();
  });

  test('"frodo info --scriptFriendly": should output cookie name, session id, and access token in json', async () => {
    const CMD = `frodo info --scriptFriendly ${host} ${user} ${pass}`;
    const { stdout } = await exec(CMD, env);
    expect(stdout).toMatchSnapshot();
  });
});
