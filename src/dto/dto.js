const topUsersQuery=`select * from public.transactions t 
where date_part($1,"timestamp")=$2
order by amount desc
limit 10;`;

const loyalityScoreQuery=`select count(1),sum(amount) from public.transactions t where userid =$1 group by userid;`;

const highestTransactionCount=`WITH cte AS (
  SELECT
      date_trunc('day', timestamp) AS day,
      COUNT(1) AS count,
      ROW_NUMBER() OVER (PARTITION BY EXTRACT(month FROM timestamp) ORDER BY COUNT(*) DESC) AS row_number
  FROM
      public.transactions t
  WHERE
      date_part('year', "timestamp") = $1
  GROUP BY
      day, timestamp
)
SELECT
  to_char(day,'DDth Mon YYYY'),
  count
FROM
  cte
WHERE
  row_number = 1
ORDER BY
  day;`

module.exports={
  topUsersQuery,
  loyalityScoreQuery,
  highestTransactionCount
}