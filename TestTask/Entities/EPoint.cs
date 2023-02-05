using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TestTask.DTOs;

namespace TestTask.Entities
{
    public class EPoint
    {
        public EPoint()
        {
            Comments = new List<EComment>();
        }

        public EPoint(Point point)
        {
            Id = point.Id;
            X = point.X;
            Y = point.Y;    
            Radius = point.Radius;  
            Color= point.Color;
            Comments = new List<EComment>();
            foreach (var comment in point.Comments)
            {
                EComment eComment = new EComment(comment);
                Comments.Add(eComment);
            }
        }

        [Key] public int Id { get; set; }

        [Required] public int X { get; set; }

        [Required] public int Y { get; set; }

        [Required] public int Radius { get; set; }

        [Required] public string Color { get; set; }

        public IList<EComment> Comments { get; set; }
    }
}
