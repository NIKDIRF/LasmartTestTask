using System.Threading.Tasks;
using TestTask.Entities;

namespace TestTask.Services
{
    public interface ICommentService
    {
        Task<EComment> addCommentToPoint(EComment comment, int pointId);
    }
}
