using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestTask.DTOs;
using TestTask.Entities;
using TestTask.Models;
using TestTask.Services;

namespace TestTask.Controllers
{
    public class PointController : Controller
    {
        private readonly ILogger<PointController> _logger;
        private readonly IPointService _pointService;


        public PointController(ILogger<PointController> logger, IPointService pointService)
        {
            _logger = logger;
            _pointService = pointService;
        }

        [HttpPost]
        public async Task<Point> AddPoint([FromBody] Point point)
        {
            var result = await this._pointService.Create(new EPoint(point));
            return new Point(result);
        }

        [HttpGet]
        public async Task<IReadOnlyCollection<Point>> GetAll()
        {
            var ePoints = await this._pointService.FindAll();
            var points = new List<Point>();
            foreach (var ePoint in ePoints)
            {
                var point = new Point(ePoint);
                points.Add(point);
            }
            return points;
        }

        [HttpDelete]
        public async Task<bool> DeletePoint([FromQuery] int id)
        {
            return await _pointService.Delete(id);
        }
    }
}
