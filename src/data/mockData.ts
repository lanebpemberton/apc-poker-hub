export interface PokerGame {
  id: string;
  time: string;
  venueName: string;
  venueImage: string;
  location: string;
  gameType: string;
  prizeAmount: string;
  ageRequirement: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'announcement' | 'winner' | 'update';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  prizePool: string;
  featured: boolean;
}

export interface LeaderboardPlayer {
  id: string;
  rank: number;
  name: string;
  points: number;
  gamesPlayed: number;
  avatar: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  memberSince: string;
  gamesPlayed: number;
  totalWinnings: string;
  currentRank: number;
  seasonPoints: number;
}

// Mock Games by Day
export const gamesByDay: Record<string, PokerGame[]> = {
  Sun: [
    {
      id: '1',
      time: '2:00 PM',
      venueName: 'The Brass Tap',
      venueImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
      location: 'Johns Creek, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$500',
      ageRequirement: '21+',
    },
    {
      id: '2',
      time: '6:00 PM',
      venueName: 'Mac McGee\'s',
      venueImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400',
      location: 'Decatur, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$750',
      ageRequirement: '21+',
    },
  ],
  Mon: [
    {
      id: '3',
      time: '7:00 PM',
      venueName: 'Taco Mac',
      venueImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400',
      location: 'Alpharetta, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$400',
      ageRequirement: '21+',
    },
  ],
  Tue: [
    {
      id: '4',
      time: '7:00 PM',
      venueName: 'Hudson Grille',
      venueImage: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400',
      location: 'Midtown, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$600',
      ageRequirement: '21+',
    },
    {
      id: '5',
      time: '8:00 PM',
      venueName: 'Whitehall Tavern',
      venueImage: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400',
      location: 'Buckhead, GA',
      gameType: 'Pot Limit Omaha',
      prizeAmount: '$500',
      ageRequirement: '21+',
    },
  ],
  Wed: [
    {
      id: '6',
      time: '7:00 PM',
      venueName: 'The Local No. 7',
      venueImage: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
      location: 'Tucker, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$550',
      ageRequirement: '21+',
    },
  ],
  Thu: [
    {
      id: '7',
      time: '7:00 PM',
      venueName: 'Marlow\'s Tavern',
      venueImage: 'https://images.unsplash.com/photo-1538488881038-e252a119ace7?w=400',
      location: 'Sandy Springs, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$700',
      ageRequirement: '21+',
    },
    {
      id: '8',
      time: '8:30 PM',
      venueName: 'Stats Brewpub',
      venueImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
      location: 'Downtown Atlanta, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$1,000',
      ageRequirement: '21+',
    },
  ],
  Fri: [
    {
      id: '9',
      time: '7:00 PM',
      venueName: 'Big Game Sports Bar',
      venueImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400',
      location: 'Roswell, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$800',
      ageRequirement: '21+',
    },
    {
      id: '10',
      time: '9:00 PM',
      venueName: 'Fadó Irish Pub',
      venueImage: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400',
      location: 'Buckhead, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$1,200',
      ageRequirement: '21+',
    },
  ],
  Sat: [
    {
      id: '11',
      time: '1:00 PM',
      venueName: 'Schoolhouse Brewing',
      venueImage: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=400',
      location: 'Marietta, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$500',
      ageRequirement: '21+',
    },
    {
      id: '12',
      time: '5:00 PM',
      venueName: 'The Fred',
      venueImage: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400',
      location: 'Johns Creek, GA',
      gameType: 'Tournament',
      prizeAmount: '$2,000',
      ageRequirement: '21+',
    },
    {
      id: '13',
      time: '8:00 PM',
      venueName: 'Vortex Bar & Grill',
      venueImage: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400',
      location: 'Little Five Points, GA',
      gameType: 'No Limit Texas Hold\'em',
      prizeAmount: '$750',
      ageRequirement: '21+',
    },
  ],
};

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Venue Alert: Stats Brewpub Downtown',
    description: 'We\'re excited to announce our newest venue partner! Join us every Thursday at Stats Brewpub in Downtown Atlanta.',
    date: '2 hours ago',
    category: 'announcement',
  },
  {
    id: '2',
    title: 'Congratulations to Mike T. - Weekly Champion!',
    description: 'Mike T. took down the Saturday night tournament at The Fred with an impressive final table performance.',
    date: '1 day ago',
    category: 'winner',
  },
  {
    id: '3',
    title: 'Schedule Update: Tuesday Games Now at 7 PM',
    description: 'All Tuesday evening games will now start at 7 PM instead of 7:30 PM. Plan your week accordingly!',
    date: '3 days ago',
    category: 'update',
  },
  {
    id: '4',
    title: 'Season 12 Leaderboard Reset Coming Soon',
    description: 'Season 11 ends on December 31st. Final standings will be locked and prizes distributed shortly after.',
    date: '5 days ago',
    category: 'announcement',
  },
  {
    id: '5',
    title: 'Winner Spotlight: Sarah K.',
    description: 'Sarah K. has been on fire this month with 3 first-place finishes. Read about her winning strategy.',
    date: '1 week ago',
    category: 'winner',
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Monthly Championship Tournament',
    date: 'Dec 21, 2024',
    time: '2:00 PM',
    venue: 'The Fred - Johns Creek',
    description: 'Our biggest monthly event with guaranteed prize pool. Top 10 finishers earn season points.',
    prizePool: '$5,000',
    featured: true,
  },
  {
    id: '2',
    title: '2 Wins = 1 Spin Promo',
    date: 'Ongoing',
    time: 'All Games',
    venue: 'All Venues',
    description: 'Win any 2 games in a week and earn a spin on our prize wheel for bonus prizes!',
    prizePool: 'Varies',
    featured: true,
  },
  {
    id: '3',
    title: 'New Year\'s Eve Special',
    date: 'Dec 31, 2024',
    time: '8:00 PM',
    venue: 'Fadó Irish Pub - Buckhead',
    description: 'Ring in the new year with cards! Special tournament with champagne toast at midnight.',
    prizePool: '$3,000',
    featured: false,
  },
  {
    id: '4',
    title: 'Beginner\'s Night',
    date: 'Every Wednesday',
    time: '6:00 PM',
    venue: 'Taco Mac - Alpharetta',
    description: 'New to poker? Join our beginner-friendly games with free lessons before the tournament.',
    prizePool: '$200',
    featured: false,
  },
];

export const leaderboard: LeaderboardPlayer[] = [
  { id: '1', rank: 1, name: 'Mike T.', points: 2450, gamesPlayed: 45, avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', rank: 2, name: 'Sarah K.', points: 2380, gamesPlayed: 42, avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', rank: 3, name: 'James W.', points: 2210, gamesPlayed: 38, avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', rank: 4, name: 'David L.', points: 2150, gamesPlayed: 41, avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', rank: 5, name: 'Emily R.', points: 2080, gamesPlayed: 36, avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '6', rank: 6, name: 'Chris M.', points: 1950, gamesPlayed: 33, avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', rank: 7, name: 'Amanda P.', points: 1890, gamesPlayed: 35, avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: '8', rank: 8, name: 'Robert H.', points: 1820, gamesPlayed: 30, avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '9', rank: 9, name: 'Jessica N.', points: 1750, gamesPlayed: 28, avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '10', rank: 10, name: 'Lane B.', points: 1680, gamesPlayed: 25, avatar: 'https://i.pravatar.cc/150?img=12' },
];

export const userProfile: UserProfile = {
  name: 'Lane',
  avatar: 'https://i.pravatar.cc/150?img=12',
  memberSince: 'March 2023',
  gamesPlayed: 25,
  totalWinnings: '$1,250',
  currentRank: 10,
  seasonPoints: 1680,
};