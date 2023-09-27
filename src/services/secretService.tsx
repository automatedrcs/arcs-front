import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: `projects/arcs-391022 ]/secrets/${secretName}/versions/latest`
  });

  const payload = version.payload!.data!.toString();
  return payload;
}
