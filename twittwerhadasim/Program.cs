using System;

namespace twittwerhadasim
{
    class Program
    {
        static void Print(double width, double height)
        {
            int width1=(int)width;
            int height1=(int)height;
            double sumStars = 5;
            //כמות המספרים האיזוגים בין 1 לרוחב
            int sumeven = (width1 - 3) / 2;
            //בחלוקה שווה כמה שורות יודפסו באותו רוחב
            int sumrows = (height1 - 2) / sumeven;
            int currentRow = 1;
            //מספר השורות באותו רוחב החלק העליון
            int sumUpperPart = (height1 - 2 - (sumrows * sumeven));
            int till = sumUpperPart + sumrows;
            for (int i = 0; i < height1; i++)
            {
                //עבור שורה עליונה הדפס *
                if (i == 0)
                {
                    Console.WriteLine(new string(' ', (int)(width - 1) / 2) + '*' + new string(' ', (int)(width - 1) / 2));
                }
                //עבור שורה אחרונה הדפס* כרוחב המשולש
                else
                {
                    if (i == (height - 1))
                        Console.WriteLine(new string('*', (int)width));
                   
                    else 
                    {
                        //עבור קבוצת שורות עליונה הדפס*** לפי הצורך
                        if (i <= till)
                            Console.WriteLine(new string(' ', (int)(width - 3) / 2) + new string('*', 3) + new string(' ', (int)(width - 3) / 2));
                         else
                         {
                            //עבור שאר השורות הדפס שורות ** זהות כנצרך
                            if (currentRow <= sumrows)
                            {
                                Console.WriteLine(new string(' ', (int)(width - sumStars) / 2) + new string('*', (int)sumStars) + new string(' ', (int)(width - sumStars) / 2));
                                currentRow++;
                            }
                            else
                            {
                                sumStars = sumStars + 2;
                                Console.WriteLine(new string(' ', (int)(width - sumStars) / 2) + new string('*', (int)sumStars) + new string(' ', (int)(width - sumStars) / 2));
                                currentRow = 2;
                            }


                         }
                    }
                }


            }


        }


         static void Main(string[] args)
        {
            int option = 0, optiont;
            double width = 0, height = 0;
            double leg = 0;
            Console.WriteLine("Tap 1 to select a rectangle. Tap 2 to select a triangle");
            option = int.Parse(Console.ReadLine());
            while (option != 3)
            {
                if (option != 1 && option != 2)
                    Console.WriteLine("iligal choice,please choose again");
                else
                {
                    Console.WriteLine("insert height");
                    height = int.Parse(Console.ReadLine());
                    Console.WriteLine("insert width");
                    width = int.Parse(Console.ReadLine());

                    if (option == 1)
                    {
                        if (width == height || Math.Abs(width - height) > 5)
                            Console.WriteLine("The area is:{0}", width * height);
                        else
                            Console.WriteLine("the perimeter is:{0}", (2 * (width + height)));
                    }
                    else if (option == 2)
                    {

                        Console.WriteLine("Press 1 to calculate the perimeter. Press 2 to print the triangle");
                        optiont = int.Parse(Console.ReadLine());
                        if (optiont == 1)
                        {
                            double widtht = width / 2;
                            leg = Math.Sqrt(Math.Pow(height, 2) + Math.Pow(widtht, 2));
                            Console.WriteLine("the perimeter is:{0}", (width + 2 * leg));

                        }
                        else
                        {
                            if (width % 2 == 0 || width > (2 * height))
                                Console.WriteLine("The triangle cannot be printed");
                            else
                                Print(width, height);
                        }


                    }
                }

                Console.WriteLine("Tap 1 to select a rectangle. Tap 2 to select a triangle.TAP 3 TO EXIT");
                option = int.Parse(Console.ReadLine());
            }

        }
    }
}
