using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TestTask.DB;
using TestTask.Entities;

namespace TestTask.Services
{
    public class CommentService : ICommentService
    {
        private readonly PointDBContext _context;

        public CommentService(PointDBContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<EComment> addCommentToPoint(EComment comment, int pointId)
        {
            var point = await _context.EPoints.Include(tmp => tmp.Comments).FirstOrDefaultAsync(eptoint => eptoint.Id == pointId);
            comment.Point = point;
            _context.EComments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }
    }
}
