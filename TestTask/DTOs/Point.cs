using System.Collections.Generic;
using System.Drawing;
using TestTask.Entities;

namespace TestTask.DTOs
{
    public class Point
    {
        public Point()
        {

        }
        public Point(EPoint ePoint)
        {
            Id = ePoint.Id;
            X = ePoint.X;
            Y = ePoint.Y;
            Radius= ePoint.Radius;
            Color= ePoint.Color;
            Comments = new List<Comment>();
            foreach (var comment in ePoint.Comments)
            {
                Comment eComment = new Comment(comment);
                Comments.Add(eComment);
            }
        }

        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Radius { get; set; }
        public string Color { get; set; }

        public IList<Comment> Comments { get; set; }

    }
}
