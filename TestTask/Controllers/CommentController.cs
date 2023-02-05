using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using TestTask.DTOs;
using TestTask.Entities;
using TestTask.Services;

namespace TestTask.Controllers
{
    public class CommentController
    {
        private readonly ILogger<PointController> _logger;
        private readonly ICommentService _service;


        public CommentController(ILogger<PointController> logger, ICommentService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpPost]
        public async Task<Comment> AddComment([FromBody] Comment comment)
        {
             var res = await _service.addCommentToPoint(new EComment(comment), comment.PointId);
            return new Comment(res);
        }
    }
}
