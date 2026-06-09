import { FiStar } from 'react-icons/fi';

const ReviewCard = ({ review }) => {
  return (
    <article className="glass-panel rounded-[1.75rem] border-white/10 p-6">
      <div className="flex gap-1 text-gold">
        {Array.from({ length: review.rating }).map((_, index) => (
          <FiStar key={index} />
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-white/72">{review.review}</p>
      <div className="mt-6">
        <p className="font-semibold text-white">{review.name}</p>
        <p className="text-sm text-white/50">{review.role}</p>
      </div>
    </article>
  );
};

export default ReviewCard;
