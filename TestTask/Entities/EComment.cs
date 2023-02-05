using System.ComponentModel.DataAnnotations;
using TestTask.DTOs;

namespace TestTask.Entities
{
    public class EComment
    {
        public EComment()
        {

        }
        public EComment(Comment comment) {
            Id = comment.Id;
            Text= comment.Text;
            BackgroundColor= comment.BackgroundColor;
            PointId= comment.PointId;
        }

        [Key] public int Id { get; set; }

        [Required] public string Text { get; set; }

        [Required] public string BackgroundColor { get; set; }

        public int PointId { get; set; }

        [Required] public EPoint Point { get; set; }
    }
}
