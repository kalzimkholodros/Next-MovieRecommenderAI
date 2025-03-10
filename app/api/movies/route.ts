import { NextResponse } from 'next/server';

const movies = [
  {
    _id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    year: 2008,
    rating: 9.0,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    category: 'Action'
  },
  {
    _id: '2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    year: 2010,
    rating: 8.8,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    category: 'Sci-Fi'
  },
  {
    _id: '3',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    year: 1994,
    rating: 9.3,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    category: 'Drama'
  },
  {
    _id: '4',
    title: 'The Hangover',
    description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
    year: 2009,
    rating: 7.7,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTU1MDA1MTYwMF5BMl5BanBnXkFtZTcwMDcxMzA3Mg@@._V1_.jpg',
    category: 'Comedy'
  },
  {
    _id: '5',
    title: 'The Conjuring',
    description: 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
    year: 2013,
    rating: 7.5,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjU5OWVlN2EtODNlYy00MjFuLWE0YzktY2Q5M2IzNDgxZjU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    category: 'Horror'
  },
  {
    _id: '6',
    title: 'The Notebook',
    description: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
    year: 2004,
    rating: 7.8,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTk3OTg5MzQ5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_.jpg',
    category: 'Romance'
  },
  {
    _id: '7',
    title: 'March of the Penguins',
    description: 'In the Antarctic, every March since the beginning of time, the quest begins to find the perfect mate and start a family.',
    year: 2005,
    rating: 7.6,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjA0NjU5MTY5NF5BMl5BanBnXkFtZTcwMzk5MTA3MQ@@._V1_.jpg',
    category: 'Documentary'
  },
  {
    _id: '8',
    title: 'Spirited Away',
    description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    year: 2001,
    rating: 8.6,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    category: 'Animation'
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json(
        { error: 'Category parameter is required' },
        { status: 400 }
      );
    }
    
    // Format category to match database format (e.g., "sci-fi" to "Sci-Fi")
    const formattedCategory = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const filteredMovies = movies.filter(movie => movie.category === formattedCategory);
    
    return NextResponse.json(filteredMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
} 