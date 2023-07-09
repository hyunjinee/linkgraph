import { getApiDocs } from '~/lib/swagger';
import ReactSwagger from './ReactSwagger';

const Swagger = async () => {
  const spec = await getApiDocs();

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
};

export default Swagger;
