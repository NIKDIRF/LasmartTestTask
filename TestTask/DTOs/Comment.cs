using TestTask.Entities;

namespace TestTask.DTOs
{
    public class Comment
    {
        public Comment()
        {

        }
        public Comment(EComment comment)
        {
            Id = comment.Id;
            Text = comment.Text;
            BackgroundColor = comment.BackgroundColor;
            PointId = comment.PointId;
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public string BackgroundColor { get; set; }
        public int PointId { get; set; }
    }
}
