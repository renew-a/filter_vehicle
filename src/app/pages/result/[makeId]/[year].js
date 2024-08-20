import Link from 'next/link';

const URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { makeId: '467', year: '2024' } },
    ],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { makeId, year } = params;

  try {
    const response = await fetch(`${URL}${makeId}/modelyear/${year}?format=json`);

    if (!response?.ok) {
      throw new Error(`HTTP error: ${response?.status}`);
    }

    const data = await response?.json();

    return {
      props: {
        models: data?.Results || [],
        makeId,
        year,
      },
    };
  } catch (error) {
    console.error('Error:', error);
  }
}

export default function ResultPage({ models, makeId, year }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {models.length && (
          <ul>
            {models.map((model) => (
              <li key={model.Model_ID} className="border-b py-2">{model.Model_Name}</li>
            ))}
          </ul>
        )}
        <div className="mt-6">
          <Link href="/">
            <a className="inline-block px-6 py-2 text-white">
              Back
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
