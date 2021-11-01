import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';

const client = new SSMClient({ region: 'eu-west-1' });
export default async function fetch(params: any) {
  const promises = params.map((param: any) => client.send(new GetParameterCommand(param))
    .then((data) => data.Parameter));
  return Promise.all(promises);
}
